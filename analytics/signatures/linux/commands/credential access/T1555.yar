rule T1555_password_stores_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1555 Credentials from Password Stores"
        description = "Looking for attempts to find credentials on system which dont fit under the 5 defined subtechniques."
        author = "jaalma"

    strings:
        $source = "cowrie"
        $s1 = "/tmp/vnc-password.txt" // plaintext password on HiveOS

    condition:
        $source and $s1
}