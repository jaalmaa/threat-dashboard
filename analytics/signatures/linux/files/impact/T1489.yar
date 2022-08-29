rule T1489_service_stop {

    meta:
        data_source = "file"
        technique_name = "Service Stop"
        description = "Killing services."
        author = "ssafuze"

    strings:
        $s1 = "killall"

    condition:
        $s1
}