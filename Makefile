.PHONY: sync-aurora

sync-aurora:
	ssh ec2-user@blackbox.notifier.vonixcc.com.br "make dump db=${db} pass=${pass}"
	rsync -Oazv ec2-user@blackbox.notifier.vonixcc.com.br:/home/ec2-user/bkps/${db}.bkp ./backup/${db}.bkp
	docker exec -i callcenter-db_db_1 mysql -h localhost -u root -pcallcenter -e "DROP DATABASE IF EXISTS callcenter"
	docker exec -i callcenter-db_db_1 mysql -h localhost -u root -pcallcenter -e "CREATE DATABASE IF NOT EXISTS callcenter"
	docker exec -i callcenter-db_db_1 mysql -h localhost -u root -pcallcenter callcenter < ./backup/${db}.bkp
