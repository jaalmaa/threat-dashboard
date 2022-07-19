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

    condition:
        $source and any of ($s1, $s2)
}
