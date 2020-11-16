#version 330 core
out vec4 FragColor;

in vec3 Normal;
in vec2 TexCoord;
in vec3 FragPos;

uniform vec4 color;
uniform vec4 lightColor;
uniform vec3 lightPos;
uniform vec4 ambientColor;
uniform float ambientStrength;
uniform vec3 viewPos;
uniform float specularStrength;

uniform sampler2D texture_diffuse0;
uniform sampler2D texture_diffuse1;
uniform sampler2D texture_diffuse2;
uniform sampler2D texture_specular0;
uniform sampler2D texture_specular1;

void main() {
	vec3 norm = normalize(Normal);
	vec3 lightDir = normalize(lightPos - FragPos);
	float diff = max(dot(norm, lightDir), 0.0);
	vec3 diffuse = diff * vec3(lightColor);

	vec3 ambient = ambientStrength * vec3(ambientColor);

	vec3 viewDir = normalize(viewPos - FragPos);
	vec3 reflectDir = reflect(-lightDir, norm);
	float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32);
	vec3 specular = specularStrength * spec * vec3(lightColor);

	vec3 lighting = ambient + diffuse + specular;

	FragColor = vec4(lighting, 1) * color * texture(texture_diffuse0, TexCoord);
}