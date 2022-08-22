rule PiIRCBackdoor {

    meta:
        data_source = "file download"
        description = "Shell script associated with raspberry pi backdoor."
        reference = "https://www.linux-magazine.com/Issues/2019/224/Rasp-Pi-Security"
        author = "ssafuze"

    strings:
        $s1 = "#!/bin/bash"
        $s2 = "bins.deutschland-zahlung.eu"
        $s3 = "81sG1WACcZgzPn8A0Wn58hHXWqy5yOgTlYJEbOjhkHD0MRsAkfJgjU/ioCYDeR1"

    condition:
        $s1 and $s2 and $s3
}