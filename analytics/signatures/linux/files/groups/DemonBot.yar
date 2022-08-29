rule DemonBot {

    meta:
        data_source = "file download"
        description = "Looks for evidence file is a DemonBot or associated with."
        reference = "https://blog.radware.com/security/2018/11/hadoop-yarn-an-assessment-of-the-attack-surface-and-its-exploits/"
        author = "ssafuze"
        note = "Exact purpose or association of this string is unclear. It will be beneficial to see what files this rule triggers on."

    strings:
        $s1 = "/x38/xFJ/x93/xID/x9A" // repeating string

    condition:
        $s1
}