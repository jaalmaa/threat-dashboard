rule T1082_system_info_discovery_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1082 System Information Discovery"
        description = "Look for attempts to find info about system."
        author = "ssafuze"

    strings:
        $source = "cowrie"
        $s1 = "cat /bin/echo" // Common technique to identify system architecture
        $s2 = /cat \/proc\/(uptime|cpuinfo)/
        $s3 = "uname"
        $s4 = /('| )free('| )/

    condition:
        $source and ($s1 or $s2 or $s3 or $s4)
}
