rule T1105_ingress_tool_transfer_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1105 Ingress Tool Transfer"
        description = "Looking for commands used to transfer tools/files from other systems."
        author = "ssafuze"

    strings:
        $source = "cowrie"
        $s1 = "scp -t" // ingress transfers only

    condition:
        $source and $s1
}
