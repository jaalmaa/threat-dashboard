rule MeowBins {

    meta:
        data_source = "file download"
        description = "Looks for evidence linking file to MeowBins."
        author = "ssafuze"

    strings:
        $s1 = "MeowBins" 

    condition:
        $s1
}