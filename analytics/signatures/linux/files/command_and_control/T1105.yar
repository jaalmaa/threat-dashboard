rule T1105_ingress_tool_transfer {

    meta:
        data_source = "file"
        technique_name = "Ingress Tool Transfer"
        description = "Getting tools onto system."
        author = "ssafuze"

    strings:
        $s1 = /apt(-get)? install/
        $s2 = "wget"
        $s3 = "curl"

    condition:
        $s1 or $s2 or $s3
}