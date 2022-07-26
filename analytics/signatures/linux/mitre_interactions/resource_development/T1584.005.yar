rule T1584_005_botnet_attack_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1584.005 Compromise Infrastructure: Botnet"
        description = "This rule looks for activity suggesting attempts to compromise machine for botnet."
        author = "jaalma"

    strings:
        $source = "cowrie"
        $s1 = /echo -e '\\+x67\\+x61\\+x79\\+x66\\+x67\\+x74'/ // String related to bashlite botnet

    condition:
        $source and $s1
}