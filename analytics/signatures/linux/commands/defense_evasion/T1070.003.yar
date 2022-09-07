rule T1070_003_clear_command_history_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1070.003 Indicator Removal on Host: Clear Command History"
        description = "Removal of command history."
        author = "ssafuze"

    strings:
        $source = "cowrie"
        $s1 = "history -c"

    condition:
        $source and $s1
}