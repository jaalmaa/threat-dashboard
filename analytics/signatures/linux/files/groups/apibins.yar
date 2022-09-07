rule apibins {

    meta:
        data_source = "file download"
        description = "Looks for evidence file is related to previously seen apibins.sh."
        author = "ssafuze"

    strings:
        $s1 = "109.206.241.200" // IP discovered in shell script apibins

    condition:
        $s1
}