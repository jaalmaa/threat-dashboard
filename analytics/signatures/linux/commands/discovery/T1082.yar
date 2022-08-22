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
        $s5 = "/ip cloud print" // https://malwaremily.medium.com/honeypot-logs-a-botnets-search-for-mikrotik-routers-48e69e110e52
        $s6 = "nvidia-smi" // related to GPU 

    condition:
        $source and any of ($s1, $s2, $s3, $s4, $s5, $s6)
}
