rule T1078_001_default_accounts_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1078.001 Valid Accounts: Default Accounts"
        description = "This rule attempts to catch initial access using default credentials to the Cowrie honeypot."
        author = "jaalma"

    strings:
        $source = "cowrie"
        $s1 = "admin:admin"
        $s2 = "support:support"
        $s3 = "user:1" // Hive OS
        $s4 = "root:root"

    condition:
        $source and any of ($s1, $s2, $s3, $s4)
}
