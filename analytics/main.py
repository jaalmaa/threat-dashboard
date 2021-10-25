import json
import os
from flask import Flask, jsonify, request
from flask_expects_json import expects_json
import yara_analysis

service = Flask(__name__)

# initialization of ruleset on startup
yara_analysis.compile_signature_rules()
signature_ruleset = yara_analysis.load_signature_rules()

@service.get("/")
def root():
    """This route can be used as a health check to make sure it is working."""
    response = { 'message': 'success' }
    return jsonify(response), 200


@service.post("/analyze")
@expects_json(json.load(open(os.path.abspath('schemas/interaction.schema.json'))))
def analyze():
    request_data = request.get_json()
    honeypot_type = request_data['honeypot_type']
    interaction_data = request_data['honeypot_data']
    detections = yara_analysis.analyze_interaction(interaction_data=str(interaction_data), ruleset = signature_ruleset)
    return jsonify({
        'detections': detections
    }), 200


if __name__ == '__main__':
    service.run(host='0.0.0.0', debug=True)