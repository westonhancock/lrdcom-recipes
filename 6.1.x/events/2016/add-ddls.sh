
STRUCTURE_IDS=( 
69365905
67579330
69069681
69488654
69701496
69756087
69756091
69756095
69756099
69756103
69756107
69756111
69756115
69756119
68745907
)
STRUCTURE_NAMES=( 
Agenda
Rooms
Speakers
Sponsors
"Nav Links"
Maps
Contacts
Activities
"Photo Galleries"
News
"Beacon Regions"
"Beacon Region Events"
"Beacon Individual Events"
"Beacon Forms"
"Expert Exchange"
)

SITE_NAME=LPSF-UK

#events2016
GROUPID=67510365

USER=allen.ziegenfus@liferay.com
echo -n Password for $USER:
read -s PASSWORD
echo

count=0
while [ "x${STRUCTURE_IDS[count]}" != "x" ]
do

    echo ${STRUCTURE_IDS[count]} ${STRUCTURE_NAMES[count]}
   DDL_NAME="${SITE_NAME} | ${STRUCTURE_NAMES[count]}"
   echo DDL_NAME: $DDL_NAME
   DDL_NAME_MAP="{\"en_US\": \"$DDL_NAME\"}" 
   DDL_NAME_MAP="{'en_US': '$DDL_NAME'}" 
   echo DDL_NAME_MAP: $DDL_NAME_MAP

curl https://www.liferay.com/api/secure/jsonws/ddlrecordset/add-record-set \
  -u $USER:$PASSWORD \
  -d groupId=$GROUPID \
  -d ddmStructureId=${STRUCTURE_IDS[count]} \
  -d recordSetKey= \
  -d nameMap="$DDL_NAME_MAP" \
  -d descriptionMap="$DDL_NAME_MAP" \
  -d minDisplayRows=20 \
  -d scope=0

   count=$(( $count + 1 ))
done


