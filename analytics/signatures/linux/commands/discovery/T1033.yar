rule T1033_system_owner_user_discover_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1033 System Owner/User Discovery"
        description = "Looking for attempts to get information about current and active users."
        author = "ssafuze"

    strings:
        $source = "cowrie"
        $s1 = /('| )w('| )/
        $s2 = "whoami"

    condition:
        $source and ($s1 or $s2)
}
