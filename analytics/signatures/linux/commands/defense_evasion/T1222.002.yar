rule T1105_permissions_modification_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1222.002 File and Directory Permissions Modification: Linux and Mac File and Directory Permissions Modification"
        description = "Look for permissions being modified on files and directories."
        author = "ssafuze"

    strings:
        $source = "cowrie"
        $s1 = "chmod"
        $s2 = "chown"

    condition:
        $source and ($s1 or $s2)
}
