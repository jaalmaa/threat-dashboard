rule T1059_004_unix_shell_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1059.004 Command and Scripting Interpreter: Unix Shell"
        description = "This rule attempts to catch execution using unix shell within the Cowrie honeypot."
        author = "jaalma"

    strings:
        $source = "cowrie.sessions"

    condition:
        $source
}
