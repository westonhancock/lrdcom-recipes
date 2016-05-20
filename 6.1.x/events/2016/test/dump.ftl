
/*
<#list banner_images.siblings as cur_image>
		<#assign cur_image_width = cur_image.banner_width.data>
			width: ${cur_image_width}				
</#list>

<#macro dumpProperties node>
      <#if node.properties??>
      <table>
        <#list node.properties?keys as key>
        <#assign value = node.properties[key]>
        <tr>
          <td>${key}</td>
          <td>
          <#if value?is_date>
            ${value?datetime}
          <#elseif value?is_boolean>
            ${value?string("yes", "no")}
          <#elseif value?is_sequence>
            [
            <#list value as valueValue>
              ${valueValue},
            </#list>
            ]
          <#else>
             ${value}
          </#if>
          </td>
        </tr>
        </#list>
      </table>
      <#else>
        Node doesn't have properties.
      </#if>
    </#macro>
   <#macro dumpObject node>

      <#if node?is_hash>
       <@dumpProperties node/>	
   <table>
  	 <#list node?keys as var>
  		 <#assign value = node[var]>
  		  
    	<tr><td>${var}</td>
    	
    	<td>
    	  <#if value?is_date>
            ${value?datetime}
          <#elseif value?is_boolean>
            ${value?string("yes", "no")}
          <#elseif value?is_sequence>
            [
            <#list value as valueValue>
              ${valueValue},
            </#list>
            ]
          <#elseif value?is_hash>
     	   <@dumpObject value/>
          <#else>
             ${value}
          </#if>
    	
    	</td>
    	
	</#list>
	</table>
	</#if>
	
	  <#if value?is_sequence>
            [
            <#list value as valueValue>
              ${valueValue},
            </#list>
            ]
       </#if>
	
   </#macro>
<#if banner_images??>
<strong>Properties for 'header_text':</strong>
<blockquote>
<@dumpObject banner_images/>
</blockquote>
<blockquote>
<@dumpProperties banner_images/>
</blockquote>
</#if>




*/


<!-- 

<#list .data_model?keys as var>
    ${var}
</#list>


<#list .main?keys as var>
    ${var}
</#list>

-->

   <#macro dumpProperties node>
      <#if node.properties??>
      <table>
        <#list node.properties?keys as key>
        <#assign value = node.properties[key]>
        <tr>
          <td>${key}</td>
          <td>
          <#if value?is_date>
            ${value?datetime}
          <#elseif value?is_boolean>
            ${value?string("yes", "no")}
          <#elseif value?is_sequence>
            [
            <#list value as valueValue>
              ${valueValue},
            </#list>
            ]
          <#else>
             ${value}
          </#if>
          </td>
        </tr>
        </#list>
      </table>
      <#else>
        Node doesn't have properties.
      </#if>
    </#macro>
   <#macro dumpObject node>
      <#if node?is_hash>
      
         <@dumpProperties node/>
   <table>
  	 <#list node?keys as var>
  		 <#assign value = node[var]>	
    	<tr><td>${var}</td>
    	<#if value?is_string>
    	<td>${value}</td>
    	<#else>
    	<td>cannot print</td>
    	</#if>
    	</tr>
    	<#if value?is_hash>
    		<@dumpObject value/>
    	</#if>
	</#list>
	</table>
	</#if>
   </#macro>
<#if header_text??>
<strong>Properties for 'header_text':</strong>
<blockquote>
<@dumpObject header_text/>
</blockquote>
<blockquote>
<@dumpProperties header_text/>
</blockquote>
</#if>
