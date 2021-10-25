import yara
import os
from pathlib import Path

SIGNATURES_DIRECTORY = os.path.abspath('./signatures')
COMPILED_SIGNATURES_DIRECTORY = os.path.abspath('./signatures/compiled')

def analyze_interaction(interaction_data: str, ruleset: list) -> list:
    signatures_triggered = []
    for rule in ruleset:
        match = rule.match(data=interaction_data)
        if match:
            signatures_triggered.append(str(match)[1:-1])
    return signatures_triggered


def load_signature_rules() -> list:
    loaded_rules = []
    for compiled_signature in list(Path(os.path.abspath(COMPILED_SIGNATURES_DIRECTORY)).rglob('*')):
        loaded_rules.append(yara.load(os.path.abspath(compiled_signature)))
    return loaded_rules


def compile_signature_rules() -> None:
    if not os.path.exists(os.path.abspath(COMPILED_SIGNATURES_DIRECTORY)): os.mkdir(COMPILED_SIGNATURES_DIRECTORY)
    compiled_signatures = os.listdir(COMPILED_SIGNATURES_DIRECTORY)
    for rule_filepath in list(Path(os.path.abspath(SIGNATURES_DIRECTORY)).rglob('*.yar')):
        compiled_filename = str(rule_filepath).split('/')[-1] + '.compiled'
        if compiled_filename not in compiled_signatures:
            compiled_rule = yara.compile(str(rule_filepath))
            compiled_rule.save(COMPILED_SIGNATURES_DIRECTORY + '/' + compiled_filename)
