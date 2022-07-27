rule T1497_001_virtualisation_sandbox_evasion_system_checks_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1497.001 Virtualization/Sandbox Evasion: System Checks"
        description = "Looking for attempts to detect virtualisation/analysis environment."
        author = "ssafuze"

    strings:
        $source = "cowrie"
        $s1 = "dmesg"
        $s2 = "lspci"
        $s3 = /grep v?(irtual|irti)/


    condition:
        $source and ($s1 or $s2) and $s3
}
