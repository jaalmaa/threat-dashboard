from flask import Flask, jsonify, request
import yara_analysis
import pymongo
import os
from gridfs import GridFS
import magic

service = Flask(__name__)

# initialization of rulesets on startup
yara_analysis.compile_signature_rules()
linux_cli_signatures = yara_analysis.load_signature_rules('/linux/commands')
linux_file_signatures = yara_analysis.load_signature_rules('/linux/files')


@service.get("/")
def root():
    """This route can be used as a health check to make sure it is working."""
    response = { 'message': 'success' }
    return jsonify(response), 200


@service.post("/analyze")
def analyze():
    client = pymongo.MongoClient(os.getenv('MONGO_IP')) 
    db = client["cowrie"]
    file_stats = db["file_stats"]
    fs = GridFS(db)

    request_data = request.get_json()

    for sha_hash in request_data['honeypot_data']['shasum']:
        file_entry = file_stats.find_one({"shasum": sha_hash})
        if not file_entry:
            honeypot_file = fs.find_one({"filename": sha_hash}) 

            if honeypot_file:
                filetype = magic.from_buffer(honeypot_file.read())
                honeypot_file.seek(0) # to allow copying of entire file in analysis function
                file_detections = yara_analysis.analyze_file(honeypot_file, linux_file_signatures)
                fs.delete(honeypot_file._id)
                file_stats.insert_one({"shasum": sha_hash, "detections": file_detections, "type": filetype})

            if "filenames" in request_data['honeypot_data']:
                if sha_hash in request_data['honeypot_data']["filenames"]:
                    for name in request_data['honeypot_data']["filenames"][sha_hash]:
                        file_stats.update_one({"shasum": sha_hash}, {"$addToSet": {"names": name}}, upsert=False)
            
        else:
            if not file_entry['detections']: # Applies signatures to file entries with no detections in case updated since last seen - need to build into reapplying updated/new signatures to all files (and commands)
                honeypot_file = fs.find_one({"filename": sha_hash})

                if honeypot_file:
                    file_detections = yara_analysis.analyze_file(honeypot_file, linux_file_signatures)
                    fs.delete(honeypot_file._id)
                else:
                    file_detections = []

                if file_detections:
                    file_stats.update_one({"shasum": sha_hash}, {"$set": {"detections": file_detections}}, upsert=False)
            
            if "filenames" in request_data['honeypot_data']:
                if sha_hash in request_data['honeypot_data']["filenames"]:
                    for name in request_data['honeypot_data']["filenames"][sha_hash]:
                        file_stats.update_one({"shasum": sha_hash}, {"$addToSet": {"names": name}}, upsert=False)
                
                
        
    detections = yara_analysis.analyze_interaction(interaction_data=str(request_data), ruleset = linux_cli_signatures) 
    return jsonify({
        'detections': detections
    }), 200


if __name__ == '__main__':
    service.run(host='0.0.0.0', debug=True)