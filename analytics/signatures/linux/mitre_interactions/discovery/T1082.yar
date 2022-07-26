rule T1082_system_info_discovery_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1082 System Information Discovery"
        description = "Look for attempts to find info about system."
        author = "ssafuze"

    strings:
        $source = "cowrie"
        $s1 = "cat /bin/echo" // Common technique to identify system architecture
        $s2 = "cat /proc/uptime"

    condition:
        $source and $s1
}
