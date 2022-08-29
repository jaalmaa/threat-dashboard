rule T1531_application_layer_protocol {

    meta:
        data_source = "file"
        technique_name = "Application Layer Protocol"
        description = "Using application layer protocols for command and control."
        author = "ssafuze"

    strings:
        $s1 = "undernet.org" nocase // Known IRC network
        $s2 = "6667" // IRC port

    condition:
        $s1 and $s2
}