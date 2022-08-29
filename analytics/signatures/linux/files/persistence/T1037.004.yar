rule T1037_004_rc_scripts {

    meta:
        data_source = "file"
        technique_name = "Boot or Logon Initialization Scripts: RC Scripts"
        description = "Persistence through RC scripts."
        author = "ssafuze"

    strings:
        $s1 = "> /etc/rc.local"

    condition:
        $s1
}