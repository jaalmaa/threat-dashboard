rule miori {

    meta:
        data_source = "file download"
        description = "Looks for evidence linking file to miori."
        author = "ssafuze"

    strings:
        $s1 = "miori" 

    condition:
        $s1
}