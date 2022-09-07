rule valve_server {

    meta:
        data_source = "file download"
        description = "Strings that seem related to Valve game servers."
        author = "ssafuze"
        reference = "https://developer.valvesoftware.com/wiki/Server_queries"

    strings:
        $s1 = "TSource Engine Query" // A2S_INFO

    condition:
        $s1
}