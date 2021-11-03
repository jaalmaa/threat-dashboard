import requests
import json
from test_data import COWRIE_INTERACTION_TEST_DATA

ANALYTICS_ENGINE_URI='http://localhost:5000'

def test_response_code_for_valid_data():
    '''this test checks that the correct status code is returned when valid data is submitted'''
    url = ANALYTICS_ENGINE_URI + '/analyze'
    headers = { 'Content-Type': 'application/json' }
    response = requests.post(url=url, data=json.dumps(COWRIE_INTERACTION_TEST_DATA), headers=headers)
    assert response.status_code == 200

def test_response_code_for_invalid_data():
    '''this test checks that the correct status code is returned when invalid data is submitted'''
    url = ANALYTICS_ENGINE_URI + '/analyze'
    headers = { 'Content-Type': 'application/json' }
    response = requests.post(url=url, data=COWRIE_INTERACTION_TEST_DATA, headers=headers)
    assert response.status_code == 400

def test_response_content_type_header():
    '''this test checks that the correct Content-Type header is returned when data is submitted'''
    url = ANALYTICS_ENGINE_URI + '/analyze'
    headers = { 'Content-Type': 'application/json' }
    response = requests.post(url=url, data=json.dumps(COWRIE_INTERACTION_TEST_DATA), headers=headers)
    assert response.headers['Content-Type'].lower() == 'application/json'

def test_signature_detections_on_test_data():
    '''this test checks that service is able to report signature detections for the data submitted'''
    url = ANALYTICS_ENGINE_URI + '/analyze'
    headers = { 'Content-Type': 'application/json' }
    response = requests.post(url=url, data=json.dumps(COWRIE_INTERACTION_TEST_DATA), headers=headers)
    data = response.json()
    expected_detections = [
        'T1059_004_unix_shell_cowrie', 
        'T1078_001_default_accounts_cowrie', 
        'T1078_004_local_accounts_cowrie'
    ]
    assert sorted(data['detections']) == sorted(expected_detections)
