package bakingmama.json;

import java.util.List;
import java.util.Map;

public class BaseJson {

  Map<String, Object> json;

  public BaseJson(Map<String, Object> json) { this.json = json; }
  public BaseJson(Map<String, Object> json, String filter) { this.json = this.castJson(json.get(filter)); }
  public BaseJson(Object json) { this.json = this.castJson(json); }

  Map<String, Object> castJson(Object json) {
    return (Map<String, Object>) json;
  }
  List<Map<String, Object>> castListJson(Object listMap) { return (List<Map<String, Object>>) listMap; }

  public Object toModel() {
    throw new UnsupportedOperationException("toModel() is not implemented for class!");
  }

}
