rule T1485_data_destruction_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "T1485"
        description = "Attempts to remove data."
        author = "ssafuze"

    strings:
        $source = "cowrie"
        $s1 = /('| )rm('| )/

    condition:
        $source and $s1
}
