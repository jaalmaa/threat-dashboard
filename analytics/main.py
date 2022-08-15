from flask import Flask, jsonify, request
import yara_analysis
import pymongo
import sys
import os
from gridfs import GridFS

service = Flask(__name__)

# initialization of rulesets on startup
yara_analysis.compile_signature_rules()
linux_cli_signatures = yara_analysis.load_signature_rules('/linux/mitre_interactions')
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

    for i in request_data['honeypot_data']['shasum']:
        file_entry = file_stats.find_one({"shasum": i})
        if not file_entry:
            honeypot_file = fs.find_one({"filename": i}) 
            
            if honeypot_file:
                file_detections = yara_analysis.analyze_file(honeypot_file, linux_file_signatures)
                fs.delete(honeypot_file._id)
            else:
                file_detections = []

            file_stats.insert_one({"shasum": i, "detections": file_detections})
            
        else:
            if not file_entry['detections']: # Applies signatures to file entries with no detections in case updated since last seen
                honeypot_file = fs.find_one({"filename": i})

                if honeypot_file:
                    file_detections = yara_analysis.analyze_file(honeypot_file, linux_file_signatures)
                    fs.delete(honeypot_file._id)
                else:
                    file_detections = []

                if file_detections:
                    file_stats.update_one({"shasum": i}, {"$set": {"detections": file_detections}}, upsert=False)
                
                
        
    detections = yara_analysis.analyze_interaction(interaction_data=str(request_data), ruleset = linux_cli_signatures)
    return jsonify({
        'detections': detections
    }), 200


if __name__ == '__main__':
    service.run(host='0.0.0.0', debug=True)