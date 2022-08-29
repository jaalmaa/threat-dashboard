rule T1489_service_stop_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1489 Service Stop"
        description = "Looking for attempts to stop or disable services."
        author = "ssafuze"

    strings:
        $source = "cowrie"
        $s1 = /(p)?kill/

    condition:
        $source and $s1
}
