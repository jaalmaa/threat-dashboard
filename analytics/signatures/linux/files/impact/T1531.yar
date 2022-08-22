rule T1531_account_access_removal {

    meta:
        data_source = "file"
        technique_name = "Account Access Removal"
        description = "Changing access to accounts."
        author = "ssafuze"

    strings:
        $s1 = "usermod -p"

    condition:
        $s1
}