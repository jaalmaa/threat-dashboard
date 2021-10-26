rule T1059_006_python_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1059.006 Command and Scripting Interpreter: Python"
        description = "This rule attempts to catch execution using python within the Cowrie honeypot."
        author = "jaalma"

    strings:
        $source = "cowrie.sessions"
        $re1 = /python/ // matches on python/python3 command within commands

    condition:
        $source and $re1
}