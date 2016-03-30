


GROUPID=67510365

USER=allen.ziegenfus@liferay.com
echo -n Password for $USER:
read -s PASSWORD
echo


curl https://www.liferay.com/api/secure/jsonws/ddlrecord/add-record \
  -u $USER:$PASSWORD \
  -d serviceContext.userId=66748356 \
  -d groupId=$GROUPID \
  -d recordSetId=71951155   \
  -d displayIndex=0 \
  -d fieldsMap="{'link_name': 'test'}" \
  -d scope=0



