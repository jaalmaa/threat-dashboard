rule T1016_system_network_discovery_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1016 System Network Configuration Discovery"
        description = "Looking for attempts to get information about network config."
        author = "ssafuze"

    strings:
        $source = "cowrie"
        $s1 = "ifconfig"

    condition:
        $source and $s1
}