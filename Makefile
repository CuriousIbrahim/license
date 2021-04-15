options = --allow-read --allow-write --allow-env --unstable
args = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`
file = cli.ts
output = license

run:
	deno run ${options} ${file} ${args}

compile:
	deno compile ${options} -o ${output} ${file}