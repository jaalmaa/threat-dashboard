rule T1059_004_unix_scripting {

    meta:
        data_source = "file"
        technique_name = "Command and Scripting Interpreter: Unix Shell"
        description = "Use of Unix scripting."
        author = "ssafuze"

    strings:
        $s1 = "#!/bin/bash"
        $s2 = "#!/bin/sh"

    condition:
        $s1 or $s2
}