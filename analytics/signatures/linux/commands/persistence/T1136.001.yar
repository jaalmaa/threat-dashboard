rule T1136_001_local_account_creation_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1136.001	Create Account: Local Account"
        description = "Creation of a local account."
        author = "ssafuze"

    strings:
        $source = "cowrie"
        $s1 = "useradd"

    condition:
        $source and $s1
}