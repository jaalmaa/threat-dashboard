rule T1531_account_access_removal_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1531 Account Access Removal"
        description = "Detecting removal of access to accounts."
        author = "ssafuze"

    strings:
        $source = "cowrie"
        $s1 = /(hive-)?passwd/

    condition:
        $source and $s1
}
