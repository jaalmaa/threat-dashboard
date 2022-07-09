COWRIE_INTERACTION_TEST_DATA = {
	"_id" : "ObjectId(\"62c9a2ebeb3e98215e9021c8\")",
	"sensor" : "cowrie",
	"startTime" : "2022-07-09T15:46:51.513916Z",
	"endTime" : "2022-07-09T15:47:07.363901Z",
	"credentials" : {
		"username" : "admin",
		"password" : "admin"
	},
	"src_ip" : "172.16.166.1",
	"session" : "0ea19ff88291",
	"commands" : [
		"pwd",
		"whoami",
		"ls",
		"wget http://google.com",
		"rm index.html ",
		"ls",
		"pwd",
		"exit\\",
		"eit",
		"exit"
	],
	"shasum" : [
		"a015814360d639336aa4c5780db4c8da7eb0fa0c857f7d80515779505a71c253"
	],
	"url" : [
		"http://google.com"
	]
}