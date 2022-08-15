import yara
import os
from pathlib import Path
import gridfs
import sys
import tempfile

SIGNATURES_DIRECTORY = os.path.abspath('./signatures')
COWRIE_FILE_DOWNLOADS = '/downloads' 

def analyze_interaction(interaction_data: str, ruleset: list) -> list:
    signatures_triggered = []
    for rule in ruleset:
        match = rule.match(data=interaction_data)
        if match:
            signatures_triggered.append(str(match)[1:-1])
    return signatures_triggered

def analyze_file(honeypot_file: gridfs.grid_file.GridOut, ruleset: list) -> int:
    signatures_triggered = []
    
    temp = tempfile.NamedTemporaryFile()
    temp.write(honeypot_file.read())

    for rule in ruleset:
        try:
            match = rule.match(temp.name)
            if match:
                signatures_triggered.append(str(match)[1:-1])
        except yara.Error:
            continue
    
    temp.close()
    return signatures_triggered

def load_signature_rules(rule_type: str) -> list:
    loaded_rules = []
    for compiled_signature in list(Path(os.path.abspath(SIGNATURES_DIRECTORY + rule_type + '/compiled')).rglob('*')):
        loaded_rules.append(yara.load(os.path.abspath(compiled_signature)))
    return loaded_rules

def compile_signature_rules() -> None:
    for rule_filepath in list(Path(os.path.abspath('.')).rglob('*.yar')):

        compiled_filename = str(rule_filepath).split('/')[-1] + '.compiled'
        
        compiled_rule = yara.compile(str(rule_filepath))

        compiled_path = "/".join(str(rule_filepath).split('/')[:-2]) + '/compiled/'

        if not os.path.exists(compiled_path):
            os.mkdir(compiled_path)

        compiled_rule.save(compiled_path + compiled_filename)

