rule T1105_ingress_tool_transfer_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1105 Ingress Tool Transfer"
        description = "Looking for commands used to transfer tools/files from other systems."
        author = "ssafuze"

    strings:
        $source = "cowrie"
        $s1 = "scp -t" // ingress transfers only
        $s2 = "curl"
        $s3 = "wget"
        $s4 = "ftpget"
        $s5 = "tftp"
        $s6 = "-c get"

    condition:
        $source and any of ($s1, $s2, $s3, $s4) or ($s5 and $s6)
}
