rule T1078_004_local_accounts_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1078.004 Valid Accounts: Local Accounts"
        description = "This rule attempts to catch initial access using local accounts to the Cowrie honeypot. All successful logins to cowrie honeypots will match this rule since the SSH logins will be to 'local' accounts."
        author = "jaalma"

    strings:
        $source = "cowrie.sessions"     /* Matches on "sessions.cowrie" string within Cowrie honeypot interactions. */
        $1 = "credentials"          /* Matches on credentials field being present within Cowrie honeypot interactions. */
    
    condition:
        $source and $1
}
