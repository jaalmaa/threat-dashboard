rule T1046_network_service_discovery {

    meta:
        data_source = "file"
        technique_name = "Network Service Discovery"
        description = "Attempts to look for services on hosts."
        author = "ssafuze"

    strings:
        $s1 = "zmap"

    condition:
        $s1
}