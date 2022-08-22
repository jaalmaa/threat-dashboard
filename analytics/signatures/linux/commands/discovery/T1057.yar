rule T1057_process_discovery_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1057 Process Discovery"
        description = "Looking for attempts to get information about running processes."
        author = "ssafuze"

    strings:
        $source = "cowrie"
        $s1 = /('| )ps('| )/

    condition:
        $source and $s1
}
