/**
     * post json鏁版嵁
     *
     * @param url
     * @param jsonStr
     * @return
     */
    public static String postJson(String url, String jsonStr) {
        String res = null;
        CloseableHttpClient httpClient = HttpClients.createDefault();
        try {
            HttpPost httpPost = new HttpPost(url);
            StringEntity stringEntity;
            //try {
                stringEntity = new StringEntity(jsonStr,"UTF-8");
                stringEntity.setContentType("application/json;charset=UTF-8");
                stringEntity.setContentEncoding("UTF-8");
            /*} catch (UnsupportedEncodingException e) {
                return null;
            }*/
            //httpPost.setHeader("Content-Type", CONTENT_TYPE_JSON);
            //httpPost.setHeader("Content-Type", "application/json;charset=utf-8");
            httpPost.setHeader(new BasicHeader("Content-Type","application/json;charset=utf-8"));
            
            httpPost.setEntity(stringEntity);
            res = execute(httpClient, httpPost);
        } finally {
            doHttpClientClose(httpClient);
        }
        return res;
    }
