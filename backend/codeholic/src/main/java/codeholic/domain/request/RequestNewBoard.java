package codeholic.domain.request;

import lombok.Data;

@Data
public class RequestNewBoard {
    String body;
    String tag;
    String title;
    String username;
    String member_name;
}