rule T1098_004_ssh_authorized_keys_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1098.004	Account Manipulation: SSH Authorized Keys"
        description = "Interactions with ssh/authorized_keys."
        author = "ssafuze"

    strings:
        $source = "cowrie"
        $s1 = ".ssh/authorized_keys"

    condition:
        $source and $s1
}
