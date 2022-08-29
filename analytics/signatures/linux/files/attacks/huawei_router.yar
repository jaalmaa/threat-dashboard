rule huawei_router {

    meta:
        data_source = "file download"
        description = "Attempts to exploit Huawei home routers."
        reference = "https://securitynews.sonicwall.com/xmlpost/new-wave-of-attacks-attempting-to-exploit-huawei-home-routers/"
        author = "ssafuze"

    strings:
        $s1 = "POST /ctrlt/DeviceUpgrade_1 HTTP/1.1"
        $s2 = "realm=\"HuaweiHomeGateway\""
        $s3 = "busybox"
    condition:
        $s1 and $s2 and $s3
}