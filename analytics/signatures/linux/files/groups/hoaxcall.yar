rule hoaxcall {

    meta:
        data_source = "file download"
        description = "Artifacts related to hoaxcall botnet."
        reference = "https://isc.sans.edu/diary/Scanning+for+SOHO+Routers/26638"
        author = "ssafuze"

    strings:
        $s1 = "Self Rep Fucking NeTiS and Thisity 0n Ur FuCkInG FoReHeAd We BiG L33T HaxErS"

    condition:
        $s1
}